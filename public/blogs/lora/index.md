---
title: "Understanding LoRA mathematically"
date: 2026-09-18
domain: NLP / EFFICIENCY
mins: "10 min read"
excerpt: "Why freezing a base model and training low-rank adapters works — the rank argument, the delta-weight update, and where the savings actually come from."
tags:
  - NLP
  - EFFICIENCY
---

LoRA (Low-Rank Adaptation) rests on an empirical observation: the change a fine-tuning run induces in a weight matrix is low-rank. So instead of updating W ∈ ℝ^(d×d), we update a product of two small matrices.

```text
W' = W₀ + ΔW       ΔW = B·A
A ∈ ℝ^(r×d),  B ∈ ℝ^(d×r),  r ≪ d
```

If r = 4 and d = 4096, each adapter layer holds 4 × 4096 + 4096 × 4 ≈ 33k parameters instead of 16.7M. Only B·A is trained; W₀ stays frozen. This is why my ASR fine-tune moved only 0.005% of the model's parameters.

## Where the savings come from

- Memory: only B and A need gradients and optimizer states.
- Storage: adapters are a few MB; the base checkpoint stays shared.
- Compute: forward pass cost is similar, but backward through a frozen base is cheaper.

> The rank r is the knob. Too small → the adapter can't express the needed delta. Too large → you're re-learning the part of the model fine-tuning was supposed to be. Pick r by probing downstream metric, not by convention.

LoRA is not magic — it's a structured prior that fine-tuning deltas live on a low-dimensional manifold. When that prior holds, single-GPU adaptation of billion-scale models stops being surprising.
