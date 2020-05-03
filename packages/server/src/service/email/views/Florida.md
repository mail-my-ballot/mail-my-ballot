{% extends "Base.md" %}

{% block request %}
I am following the instructions provided by the [state guidelines](https://dos.myflorida.com/elections/for-voters/voting/vote-by-mail/).
{% endblock %}

{% block extraFields %}
- County: **{{county}}**
- Duration: I am applying for all elections through the end of the calendar year for the second ensuing regularly scheduled general election.
{% endblock %}
