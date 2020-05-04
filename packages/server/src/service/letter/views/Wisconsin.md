{% extends "Base.md" %}

{% set guidance = 'the [Wisconsin Elections Commission](https://elections.wi.gov/sites/elections.wi.gov/files/2019-02/Faxing%20or%20Emailing%20Absentee%20Ballots.pdf)' %}

{% block body %}
- Phone: **{{phone}}**
- City / Town / Village: **{{city}}**
- County: **{{county}}**
- Elections: **{{election}}** in particular and more generally, all elections through the end of the calendar year

{% endblock %}