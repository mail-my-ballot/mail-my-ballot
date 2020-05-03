{% extends "Base.md" %}

{% block request %}
Per the instructions on the [Wisconsin Elections Commission](https://elections.wi.gov/sites/elections.wi.gov/files/2019-02/Faxing%20or%20Emailing%20Absentee%20Ballots.pdf), I am requesting an absentee ballot for the upcoming Nov 03, 2020 eleciton.
Addtionally, I am also requesting to be added to the "permanent absentee voter list" for all upcoming elections.
{% endblock %}

{% block body %}
Following the instrucitons from the [Secretary of State's website](https://sos.ga.gov/admin/uploads/Absentee_Voting_Guide_20142.pdf), I am requesting this for the end of the calendar year.

- Name: **{{name}}**
- Date of Birth: **{{birthdate}}**
- Voter Registration Address: **{{uspsAddress}}**
{% if mailingAddress %}
- Mailing Address: {{mailingAddress}}
{% else %}
- Mailing Address: Same as registration address
{% endif %}
- Email: {{email}}
- Phone: **{{phone}}**
- City: **{{city}}**
- County: **{{county}}**
- Ballot Method: I prefer my ballot to be mailed to my mailing address.
{% endblock %}