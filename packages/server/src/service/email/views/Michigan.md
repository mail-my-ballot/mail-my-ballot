{% extends "Base.md" %}

{% block request %}
I am following the instructions provided by the [secretary of state's website](https://www.michigan.gov/sos/0,4670,7-127-1633_8716_8728-21037--,00.html).
{% endblock %}

{% block extraFields %}
- Phone: **{{phone}}**
- City / Township: **{{city}}**
- County: **{{county}}**
- Election: the November, 3rd, 2020 general election

Addtionally, I am also requesting to be added to the "permanent absentee voter list" for all upcoming elections.
{% endblock %}
