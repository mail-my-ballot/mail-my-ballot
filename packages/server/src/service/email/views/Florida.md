{% extends "Base.md" %}

{% block body %}
As per [state guidelines](https://dos.myflorida.com/elections/for-voters/voting/vote-by-mail/), I am applying for all elections through the end of the calendar year for the second ensuing regularly scheduled general election.
Below are my voter registration details:

- Name: **{{name}}**
- Voter Registration Address: **{{uspsAddress}}**
- Birthdate: **{{birthdate}}**
{% if mailingAddress %}
- Mailing Address: {{mailingAddress}}
{% else %}
- Mailing Address: Same as registration address
{% endif %}

{% endblock %}
