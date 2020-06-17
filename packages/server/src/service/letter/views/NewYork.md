{% extends "LetterBase.md" %}

{% set guidance = 'the [New York State Board of Elections](https://www.elections.ny.gov/votingabsentee.html)' %}

{% block body %}
- County: **{{county}}**
- Reason: "temporary illness or physical disability" due to the potential to contract the novel coronavirus or COVID-19 (see Executive Order 202.15).
- Elections: generally, all elections through the end of the calendar year; in particular, **{{election}}**..

{% endblock %}

