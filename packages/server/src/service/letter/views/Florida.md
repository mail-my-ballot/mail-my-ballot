{% extends "LetterBase.md" %}

{% set guidance = 'the [Florida Department of State](https://dos.myflorida.com/elections/for-voters/voting/vote-by-mail/)' %}

{% block body %}
- County: **{{county}}**
- Elections: generally, all elections through the end of the calendar year for the second ensuing regularly scheduled general election; in particular, **{{election}}**.

{% endblock %}
