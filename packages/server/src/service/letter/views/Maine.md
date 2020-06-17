{% extends "LetterBase.md" %}

{% set guidance = 'the [Maine Revised Statutes §753-A](https://www.mainelegislature.org/legis/statutes/21-A/title21-Asec753-A.html)' %}

{% block body %}
- Phone: **{{phone}}**
- City or Township: **{{city}}**
- County: **{{county}}**
- Election: **{{election}}**
- Method of Ballot Delivery: By Mail.

{% endblock %}

