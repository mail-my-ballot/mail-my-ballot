{% extends "Base.md" %}

Following the instrucitons from the [Secretary of State's website](https://sos.ga.gov/admin/uploads/Absentee_Voting_Guide_20142.pdf), I am reqeusting this for the end of the calendar year.

- Name: **{{name}}}**
- Birth Year: **{{birthdate}}}**
- Voter Registration Address: **{{uspsAddress}}}**
{% if mailingAddress %}
- Mailing Address: {{mailingAddress}}
{% else %}
- Mailing Address: Same as registration address
{% endif %}
- Email: {{email}}}
- Phone: **{{phone}}}**
- City: **{{city}}}**
- County: **{{county}}}**
- Ballot Method: **{{ballotMethod}}}**
