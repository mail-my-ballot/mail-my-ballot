{% extends "LetterBase.md" %}

{% set guidance = 'the [Arizona Secretary of State](https://azsos.gov/votebymail)' %}

{% block body %}
- County: **{{county}}**
- Party: **{{party}}**
- Identity (**{{idType}}**): **{{idData}}**
- Elections: I am requesting a ballot-by-mail for the 2020 Primary and General Elections and am giving the County Recorder permission to mail my ballot to the address provided in this email.

{% endblock %}
