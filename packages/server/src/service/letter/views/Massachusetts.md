{% extends "LetterBase.md" %}

{% set guidance = 'the [Secretary of the Commonwealth of Massachusetts](https://www.sec.state.ma.us/ele/eleabsentee/absidx.htm)' %}

{% block body %}
- County: **{{county}}**
- Reason: "Physical disability" due to the potential to contract the novel coronavirus or COVID-19.
- Elections: generally, all elections through the end of the calendar year; in particular, **{{election}}**..

{% endblock %}

