{% extends "LetterBase.md" %}

{% set guidance = 'the [Oklahoma Department of Elections](https://www.ok.gov/elections/Voter_Info/Absentee_Voting)' %}

{% block body %}
- County: **{{county}}**
- Elections: generally, all elections through the end of the calendar year; in particular, **{{election}}**

{% endblock %}
