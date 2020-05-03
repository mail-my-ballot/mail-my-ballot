{% extends "Base.md" %}

{% block request %}
I am following the requirements laid out on the [Secretary of State's website](https://sos.ga.gov/admin/uploads/Absentee_Voting_Guide_20142.pdf).
{% endblock %}

{% block extraFields %}
- Email: {{email}}
- Phone: **{{phone}}**
- County: **{{county}}**
- Election: the November, 3rd, 2020 general election
{% endblock %}
