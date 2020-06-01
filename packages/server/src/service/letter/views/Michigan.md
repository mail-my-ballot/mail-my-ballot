{% extends "Base.md" %}

{% set guidance = 'the [Michigan Secretary of State](https://www.michigan.gov/sos/0,4670,7-127-1633_8716_8728-21037--,00.html)' %}

{% block body %}
- Phone: **{{phone}}**
- City or Township: **{{city}}**
- County: **{{county}}**
- Election: **{{election}}**
{% if permanentList %}
- Permanent List: Automatically send me an application to vote absentee for all future elections.
{% endif %}


{% endblock %}

<!-- Additionally, consider: I am requesting to be added to the "permanent absentee voter list" for all upcoming elections. -->