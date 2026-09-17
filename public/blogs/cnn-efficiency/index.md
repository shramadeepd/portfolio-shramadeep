---
title: "Why CNNs are computationally efficient"
date: 2026-09-18
domain: VISION
mins: "7 min read"
excerpt: "Receptive fields, weight sharing, and the parameter count difference between dense and convolutional layers — the structural reason vision models don't blow up."
tags:
  - VISION
---

A fully-connected layer connecting two images of size 224×224 has (224²)² ≈ 2.5 billion weights per layer. Nobody trains that. A CNN layer achieves the same receptive field with a few thousand parameters. The reason is structural, not cosmetic.

## Two assumptions

- Locality — nearby pixels matter together; distant pixels matter little at the first layers.
- Translation invariance — the same pattern (an edge, a corner) is useful everywhere in the image.

A convolution enforces both: a small kernel (k×k) only touches a local patch, and it's shared across every spatial location. Compare weights for a layer with c_in input channels:

```text
dense layer:   c_out × (H·W · c_in)
conv layer:    c_out × (k²   · c_in)
```

With H = W = 224 and k = 3, the dense layer is ~5,600× heavier. Stacking convolutions grows the receptive field linearly with depth while parameter count stays flat — that's the whole trick.

> Transformers later questioned the translation-invariance prior — but the efficiency argument is still the reason CNNs remain the workhorse for real-time and low-compute vision.
