{% extends "LetterBase.md" %}

{% set guidance = 'the [Maryland Code §9-305](https://codes.findlaw.com/md/election-law/md-code-elec-law-sect-9-305.html)' %}

{% block body %}
- Phone: **{{phone}}**
{% if city %}
- City: **{{city}}**
{% endif %}
{% if county %}
- County: **{{county}}**
{% endif %}
- Election: **{{election}}**
- Method of Delivery: I request that my ballot be mailed to me.

{% endblock %}
