{% extends "Base.md" %}

{% set guidance = 'the [Title 25, Chapter 293-313 of the Nevada Revised Statues](https://www.leg.state.nv.us/NRS/NRS-293.html)' %}

{% block body %}
- Phone: **{{phone}}**
- City: **{{city}}**
{% if county %}
- County: **{{county}}**
{% endif %}
- Election: generally, all elections through the end of the calendar year; in particular, **{{election}}**

{% endblock %}
