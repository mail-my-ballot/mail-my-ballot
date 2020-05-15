{% macro list(items) %}
  {% for item in items %}
  - {{ item }}
  {% endfor %}
{% endmacro %}

{% macro fax(faxes) %}
  Per said requirements, the request may be sent by fax.  It is being faxed to the following fax number(s):
  {{ list(faxes) }}
{% endmacro %}

{% macro email(emails) %}
  Per said requirements, the request may be sent by email.  It is being sent to the following email address(es):
  {{ list(emails) }}
{% endmacro %}

{% macro convenienceEmail(emails) %}
  As a convenience to the elections official, it is being emailed to the following email address(es):
  {{ list(emails) }}
{% endmacro %}

{% macro contactMethod(method) %}

{% if method.stateMethod === 'fax' %} 

  {{ fax(method.faxes) }}

  {% if method.emails | length > 0 %}
    {{ convenienceEmail(method.emails) }}
  {% endif %}

{% elif method.stateMethod === 'email' or  method.stateMethod === 'fax-email' %} 

  {% if method.emails | length > 0 %}
    {{ email(method.emails) }}
  {% else %}
    {{ fax(method.faxes) }}
  {% endif %}

{% endif %}

{% endmacro %}
