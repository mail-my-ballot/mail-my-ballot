{% extends "Base.md" %}

{% block text %}
Below are the details of my application:

- Name: **{{name}}**
- Birth Date: **{{birthdate}}**
- Voter Registration Address: **{{uspsAddress}}**
{% if mailingAddress %}
- Mailing Address: {{mailingAddress}}
{% else %}
- Mailing Address: Same as registration address
{% endif %}
- Email: {{email}}
{% block body %}
{% endblock %}

Thank you in advance for your help.  If you have any questions, please feel free to reach out at [{{email}}](mailto:{{email}}).
{% endblock %}
