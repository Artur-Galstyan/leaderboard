---
name: LC-QuAD v2
description: The Largescale Complex Question Answering Dataset 2.0 (LC-QuAD 2.0)<sup>[[2]](#myfootnote2)</sup> is a Large Question Answering dataset with 30,000 pairs of question and its corresponding SPARQL query. The target knowledge base is [Wikidata](https://wikidata.org/wiki/Wikidata:Main_Page/) and [DBpedia](https://dbpedia.org/), specifically the 2018 version. Please see our [paper](https://figshare.com/projects/LCQuAD_2_0/62270) for details about the dataset creation process and framework.
datasetUrl: https://figshare.com/projects/LCQuAD_2_0/62270
---

| Model / System            | Year | Precision | Recall | F1    | Language | Reported by                                             | Gold Entity |
| ------------------------- | ---- | --------- | ------ | ----- | -------- | ------------------------------------------------------- | ----------- |
| T5-Small                  | 2022 | -         | -      | 92    | EN       | Banerjee et al.                                         | ✅          |
| T5-Base                   | 2022 | -         | -      | 91    | EN       | Banerjee et al.                                         | ✅          |
| PGN-BERT-BERT             | 2022 | -         | -      | 86    | EN       | Banerjee et al.                                         | ✅          |
| SGPT_Q,K [1]              | 2022 | -         | -      | 89.04 | EN       | Al Hasan Rony et al.                                    | ✅          |
| PGN-BERT                  | 2022 | -         | -      | 77    | EN       | Banerjee et al.                                         | ✅          |
| NSpM [2]                  | 2022 | -         | -      | 66.47 | EN       | Al Hasan Rony et al.                                    | ✅          |
| BART                      | 2022 | -         | -      | 64    | EN       | Banerjee et al.                                         | ✅          |
| Zou et al. + Bert         | 2021 | -         | -      | 59.30 | EN       | Zou et al.                                              | ✅          |
| CLC                       | 2021 | -         | -      | 59    | EN       | Banerjee et al.                                         | ✅          |
| Multi-hop QGG             | 2020 | -         | -      | 53    | EN       | Banerjee et al.                                         | ✅          |
| Zou et al. + Tencent Word | 2021 | -         | -      | 52.90 | EN       | Zou et al.                                              | ✅          |
| Multi-hop QGG             | 2021 | -         | -      | 52.60 | EN       | Zou et al.                                              | ✅          |
| AQG-net                   | 2021 | -         | -      | 44.90 | EN       | Zou et al.                                              | ✅          |
| SGPT_Q [3]                | 2022 | -         | -      | 83.45 | EN       | Al Hasan Rony et al.                                    | ❌          |
| ChatGPT                   | 2023 | -         | -      | 42.76 | EN       | Tan et al.                                              | ❌          |
| GPT-3.5v3                 | 2023 | -         | -      | 39.04 | EN       | Tan et al.                                              | ❌          |
| GPT-3.5v2                 | 2023 | -         | -      | 33.77 | EN       | Tan et al.                                              | ❌          |
| GPT-3                     | 2023 | -         | -      | 33.04 | EN       | Tan et al.                                              | ❌          |
| FLAN-T5                   | 2023 | -         | -      | 30.14 | EN       | Tan et al.                                              | ❌          |
| UNIQORN                   | 2021 | 33.1      | -      | -     | EN       | Pramanik et al.                                         | ❌          |
| QAnswer                   | 2020 | 30.80     | -      | -     | EN       | Pramanik et al.                                         | ❌          |
| GraftNet                  | 2018 | 19.7      | -      | -     | EN       | Christmann P. et al                                     | ❌          |
| ElNeuQA-ConvS2S [1]       | 2021 | 26.90     | 27     | 26.90 | EN       | Diomedi, Hogan                                          | ❌          |
| GRAFT-Net + Clocq [2]     | 2022 | 19.70     | -      | -     | EN       | Christmann P. et al                                     | ❌          |
| Platypus                  | 2018 | 3.6       | -      | -     | EN       | Pramanik et al.                                         | ❌          |
| Pullnet                   | 2019 | 1.1       | -      | -     | EN       | [Pramanik et al.](https://arxiv.org/abs/2108.08614)     | ❌          |
| UNIK-QA                   | 2020 | 0.5       | -      | -     | EN       | [Pramanik et al.](https://arxiv.org/abs/2108.08614)     | ❌          |
| GETT-QA [4]               | 2023 | 40.3      | -      | -     | EN       | [Banerjee et al.](https://arxiv.org/pdf/2303.13284.pdf) | ❌          |
