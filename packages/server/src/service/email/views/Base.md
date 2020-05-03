Dear Local Supervisor of Elections,

I am writing to request an Absentee or Vote-by-Mail ballot through [{{brandName}}]({{brandUrl}}).
{%- block request %}
{% endblock %}

Below are my voter registration details:
- Name: **{{name}}**
- Date of Birth: **{{birthdate}}**
- Voter Registration Address: **{{uspsAddress}}**
{% if mailingAddress %}
- Mailing Address: {{mailingAddress}}
{% else %}
- Mailing Address: Same as registration address
- Email: {{email}}
{% endif %}
{%- block extraFields %}
{% endblock %}

Thank you in advance for your help.  If you have any questions, please feel free to reach out at [{{email}}](mailto:{{email}}).

Sincerely,

{{name}}{% if signature %} (Signature Attached)

<img src='{{signature}}'/>
{% endif %}

<font style='font-size:75%;'>

[{{brandName}}]({{brandUrl}}) is a Vote at Home project.
[Vote at Home](https://voteathome.org/) is a non-partisan 501(c)3 that supports vote by mail.

Questions? Feedback? email us at [{{feedbackEmail}}](mailto:{{feedbackEmail}}).

**Elections Officials**: do you want a direct, secure access to your applications?  Email us at [{{electionsEmail}}](mailto:{{electionsEmail}}) to become an the Election Offical Beta User.

Confirmation id: {{confirmationId}}

</font>
