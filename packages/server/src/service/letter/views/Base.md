{% from "ContactMethod.md" import contactMethod %}

Dear Election Official,

I am writing to request an Absentee or Vote-by-Mail ballot through [{{brandName}}]({{brandUrl}}).  This letter conforms to the requirements set forth by {{guidance}}.

{{contactMethod(method)}}

Below are the details of my application:

- Name: **{{name}}**
- Birth Year: **{{birthdate}}**
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

Sincerely,

{{name}}{% if signature %} (Signature Below and Attached)

<img style='max-width: 400px;' src='{{signature}}'/>
{% endif %}

<font style='font-size:75%;'>

[{{brandName}}]({{brandUrl}}) is a Vote at Home project.
[Vote at Home](https://voteathome.org/) is a non-partisan 501(c)3 that supports vote by mail.

Questions? Feedback? Email us at [{{feedbackEmail}}](mailto:{{feedbackEmail}}).

**Elections Officials**: do you want direct, secure access to your VBM requests?  Email us at [{{electionsEmail}}](mailto:{{electionsEmail}}) to become an the Election Offical Beta User.

Confirmation id: {{confirmationId}}

</font>
