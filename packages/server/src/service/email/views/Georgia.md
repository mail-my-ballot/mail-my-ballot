{% extends "Base.md" %}

{% block body %}
I am following the requirements laid out on the [Secretary of State's website](https://sos.ga.gov/admin/uploads/Absentee_Voting_Guide_20142.pdf).
Below are the details of my application.

- Name: **{{name}}**
- Voter Registration Address: **{{uspsAddress}}**
- Birthdate: **{{birthdate}}**
{% if mailingAddress %}
- Mailing Address: {{mailingAddress}}
{% else %}
- Mailing Address: Same as registration address
{% endif %}
- Email: {{email}}
- Phone: **{{phone}}**
- County: **{{county}}**
- Election: **{{electionType}}**
- Election Date: **{{electionDate}}**

{% endblock %}
