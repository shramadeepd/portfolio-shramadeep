---
title: "Fine-tuning ASR models with limited GPU resources"
date: 2026-09-19
domain: SPEECH / ASR
mins: "11 min read"
excerpt: "What it actually takes to adapt a multilingual speech model to a low-resource language on one T4 — data prep, PEFT, and honest evaluation."
tags:
  - SPEECH
  - ASR
---

Adapting a large multilingual speech checkpoint to a language it barely saw — with ~23 hours of audio and a single Tesla T4 — forces discipline at every stage. There's no room for waste: the budget is a few GPU-hours.

## Data rules everything

- Transcript alignment: verify text actually matches the audio (silence trimming, timestamp sanity).
- Train/val contamination: deduplicate speakers/sentences across splits — contamination inflates CER that appears to be real.
- Consistency: normalise diacritics, digit forms, and casing before computing CER, both in labels and predictions.

## PEFT is the compute strategy

Full fine-tuning of a billion-scale model on one T4 is out of reach for most tasks. LoRA adapters freeze the base and train a low-rank delta — for my run, 0.005% of parameters. Because the base stays frozen, the same checkpoint serves many tasks simultaneously with tiny per-task adapters.

```text
trainable params  : ~0.005% of full model
gradient devices   : 1 × Tesla T4
training time      : ≈ 1 hour
```

## Evaluating honestly

Report the metric that matches the task (CER for transcription), on a held-out split the model never saw during tuning. I ended at CER 0.0517 — good for the setup, but the number is only meaningful because the evaluation set was clean.

> The headline isn't the CER. It's that a language with almost no resources and a single cheap GPU is enough to build a usable recogniser when you start from a strong self-supervised base and scale the adapter, not the model.
