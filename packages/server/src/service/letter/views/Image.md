<!-- https://stackoverflow.com/questions/2426072/is-there-an-equivalent-of-css-max-width-that-works-in-html-emails -->
<!-- https://gist.github.com/elidickinson/5525752 -->

{% macro image(data) %}
  <table border="0" cellspacing="0" width="100%">
    <tr>
      <td></td>
      <td width="350">
        <img src='{{data}}' style='max-width: 350px;'/>
      </td>
      <td></td>
    </tr>
  </table> 
{% endmacro %}
