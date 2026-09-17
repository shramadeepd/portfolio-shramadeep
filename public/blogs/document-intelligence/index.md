---
title: "Building document intelligence systems"
date: 2026-09-18
domain: LLM SYSTEMS
mins: "12 min read"
excerpt: "Layout-aware extraction, chunking, embeddings, and retrieval — the engineering decisions that decide whether a document QA system actually answers questions."
tags:
  - LLM SYSTEMS
---

Document intelligence is 20% language models and 80% the unglamorous pipeline around them. Getting from a scanned PDF to a grounded answer means surviving extraction, layout, chunking, indexing, and retrieval — each stage can quietly destroy the one after it.

## Extraction is the foundation

A PDF is not 'text'. It's text, in lines, inside boxes, mixed with images, orders of magnitude more structured than a byte stream suggests. Naive text extraction flattens reading order, splits table cells across chunks, and orphans headers from their bodies.

- Recover reading order from layout boxes (x, y, size), not byte order.
- Keep tables as tables — a flattened table is a retrieval failure waiting to happen.
- Route images through OCR only when there's no embedded text layer.

## Chunking beats embeddings (often)

The embedding model decides what 'similar' means; the chunk decides what gets embedded. Layout-aware, semantically-contained chunks outperform fixed token windows on almost every retrieval metric I've measured. Anchors — keep headings attached to the section they describe.

## Retrieval is the bottleneck

Hybrid retrieval (dense vectors + keyword) is the safe default for documents, because legal, technical, and financial text is full of exact tokens that embeddings blur. Reranking retrieved candidates before the LLM gets them is cheap insurance.

> Benchmark retrieval in isolation before blaming the LLM. If top-5 retrieval is bad, no prompt will fix the answer. Measure hit-rate@k, then and only then tune generation.

The system I built routes PDF / DOCX / web through a processor, indexes chunks into a vector store (Cassandra / Astra DB), and answers with retrieved context — the architecture is deliberately boring. The interesting work is all in extraction, chunking, and eval.
