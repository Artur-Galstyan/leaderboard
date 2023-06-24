---
name: QALD 1
description: QALD is a series of evaluation campaigns on question answering over linked data, which aims at providing an up-to-date benchmark for assessing and comparing state-of-the-art systems that mediate between a user, expressing his or her information need in natural language, and RDF data. Thus, it targets all researchers and practitioners working on querying Linked Data, natural language processing for question answering, multilingual information retrieval and related topics. The main goal is to gain insights into the strengths and shortcomings of different approaches and into possible solutions for coping with the large, heterogeneous and distributed nature of Semantic Web data. QALD challenge began in 2011 and is developing benchmarks that are increasingly being used as standard evaluation venue for question answering over Linked Data. Overviews of past instantiations of the challenge are available from the CLEF Working Notes, CEUR workshop notes as well as ESWC proceedings. The key challenge for QA over Linked Data is to translate a user's natural language query into such a form that it can be evaluated using standard Semantic Web query  processing and inferencing techniques. The main task of QALD therefore is the following
Given one or several RDF dataset(s) as well as additional knowledge sources and natural language questions or keywords, return the correct answers or a SPARQL query that retrieves these answers.
datasetUrl: https://github.com/ag-sc/QALD/tree/master
---

| Model / System | Year |Precision|Recall|F1 |Language|                     Reported by                     |
|:--------------:|:----:|:-------:|:----:|:---:|:------:|:---------------------------------------------------:|
|   FREyA [1]    | 2013 |   63    |  54  |58 |   EN   |[Lopez et al.](https://arxiv.org/pdf/2105.00811.pdf) |
|   PowerAqua    | 2013 |   52    |  48  |50 |   En   |[Lopez et al.](https://arxiv.org/pdf/2105.00811.pdf) |
|    gAnswer     | 2021 |    -    |  -   |24 |   EN   |[Orogat et al.](https://arxiv.org/pdf/2105.00811.pdf)|
|  WDAqua-core0  | 2021 |    -    |  -   |14 |   EN   |[Orogat et al.](https://arxiv.org/pdf/2105.00811.pdf)|
|     AskNow     | 2021 |    -    |  -   | 7 |   EN   |[Orogat et al.](https://arxiv.org/pdf/2105.00811.pdf)|
|    QASparql    | 2021 |    -    |  -   | 1 |   EN   |[Orogat et al.](https://arxiv.org/pdf/2105.00811.pdf)|