# inarowCarousel jQuery Plugin

inarowCarousel is a jQuery plugin.
It generates the left and right arrow buttons to sequentially change 
the current image and the round buttons below the images to go straight to an image.

## Usage

Add to your HTML page the necesary scripts to jQuery core and plugin:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js" type="text/javascript"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js"></script>
<script src="jquery.inarowCarousel.js" type="text/javascript"></script>
```

Your HTML page should have a list of images like this:

```html
<div id="inarowCarousel">
    <div class="covers">
        <a href="images/image1.jpg">
            <img src="images/image1.jpg" alt="image1" />
        </a>
        <a href="images/image2.jpg">
            <img src="images/image2.jpg" alt="image2" />
        </a>
        <a href="images/image3.jpg">
            <img src="images/image3.jpg" alt="image3" />
        </a>
        <a href="images/image4.jpg">
            <img src="images/image4.jpg" alt="image4" />
        </a>
    </div>
</div>
```

Or you could want to put just the images without any link:

```html
<div class="inarowCarousel">
  <div class="covers">
    <img src="images/image1.jpg" alt="image1" />
    <img src="images/image2.jpg" alt="image2" />
    <img src="images/image3.jpg" alt="image3" />
    <img src="images/image4.jpg" alt="image4" />
  </div>
</div>
```

Finaly, add this script in the header section of your HTML:

```html
<script type="text/javascript">
//<![CDATA[
 
  $(document).ready(function(){
    $('.inarowCarousel').inarowCarousel({
      spacing: 1024,
      height: 422,
      beforeMoveCallback: function(leavingItem, commingItem){
        return confirm('¿Do you want to change the image?');
      },
      afterMoveCallback: function(leavingItem, commingItem){
        alert('This is the afterMoveCallback');
        return true; // This can be omitted.
      },
    });
  });
 
//]]>
</script>
```

## Author
<a href="http://lightbyte.org">Pedro Martín Valenciano</a> (<a href="http://twitter.com/pmv79">@pmv79</a>)

## License
<a href="http://opensource.org/licenses/mit-license.php">MIT License</a>

Copyright (c) 2012, Pedro Martín Valenciano (pedro -[at]- lightbyte [dot] org)
