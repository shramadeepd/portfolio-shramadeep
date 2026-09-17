---
title: "How CTC loss works"
date: 2026-09-18
domain: SPEECH / ASR
mins: "9 min read"
excerpt: "The blank token, repeated labels, and why CTC sidesteps the alignment problem — a worked intuition for frame-level speech recognition."
tags:
  - SPEECH
  - ASR
---

Speech-to-text has an alignment problem: audio has ~100 frames per second, but words come far more slowly, and we never annotated where each character starts. CTC (Connectionist Temporal Classification) lets a model output a character per frame and handles alignment implicitly.

## The trick

Introduce a blank token (ε). The model emits a character sequence over time, and the decoder collapses it with two rules: (1) merge adjacent repeats of the same char, (2) insert blanks to separate legitimately repeated chars.

```text
frames:   ε ε C A A ε T ε T T
collapse: C A A T T   →  (merge repeats)
  ε breaks repeats:  C A ε A T →  CAT
```

Because many different per-frame paths collapse to the same text, CTC's loss sums over ALL alignments that produce the target. That makes it differentiable: the model learns to spread probability mass over every valid frame alignment at once.

## Trade-offs

- Assumes conditional independence of frames given the input → can't learn strong language context inside the acoustic model.
- No explicit duration modelling — the blank absorbs it.
- Decoding needs beam search over output possibilities, not greedy over frames.

> Greedy 'take the argmax per frame and collapse' is a fast but lossy approximation. Proper beam search over collapsed sequences is where the last few CER points come from.
