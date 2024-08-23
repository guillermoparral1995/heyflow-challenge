## Custom Checkbox Challenge

For this challenge, I decided to implement the custom checkbox by using a div as a clickable element, which wraps inside the svg with the checkmark icon, that will be displayed or not based on the state of the checkbox.

To make it tabbable, I added a `tabindex` property to the div. Also I needed to remove the default focus styles by setting `outline:none` on `:focus` and `:focus-visible`, since I added custom focus styles whenever the class `focused` is added to the div.

To sync the custom checkbox with the native checkbox, I included event listeners on both elements. The effect of each listener is best described in comments in `index.js` file.