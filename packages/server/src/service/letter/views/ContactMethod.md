{% macro contactMethod(method) %}

{% if method.stateMethod === 'fax' %} 

  Per said requirements, the request may be sent by fax.  It is being faxed to the following fax numbers:
  {% for fax in method.faxes %}
  - {{ fax }}
  {% endfor %}

  {% if method.emails | length > 0 %}
  As a convenience to the elections official, it is being emailed to the following email addresses:
  {% for email in method.emails %}
  - {{ email }}
  {% endfor %}
  {% endif %}

{% elif method.stateMethod === 'email' or  method.stateMethod === 'fax-email' %} 

  Per said requirements, the request may be sent by email.  It is being sent to the following email addresses:
  {% for email in method.emails %}
  - {{ email }}
  {% endfor %}

{% endif %}

{% endmacro %}
