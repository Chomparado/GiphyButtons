jQuery(document).ready(function($) {


var animals = ['chicken', 'lobster', 'gorilla', 'banana'];


function appendNewButton(animal){
	var a = $('<button>')
	a.addClass('animal btn-primary');
	a.attr('data-animal', animal);
	a.text(animal);
	$('#animalButtons').append(a);
}

function renderButtons(){ 
	for (var i = 0; i < animals.length; i++){
		    appendNewButton(animals[i])
	}
}

renderButtons(); 

$('#addAnimal').on('click', function(){

	var animal = $('#animal-input').val().trim();

	animals.push(animal);
	
	appendNewButton(animal);

	$('#animal-input').val('');

	return false;
});



function animalGif() {

 		console.log(animals);

        var p = $(this).data('animal');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({url: queryURL, method: 'GET'})
            .done(function(response) {
                var results = response.data;
                $('#animalsView').empty();
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $('<div class="item">')

                    var rating = results[i].rating;

                    var p = $('<p>').text("Rating: " + rating);

                    var animalImage = $('<img>');
                    animalImage.attr('src', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-still', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-animate', results[i].images.fixed_height.url);
                    animalImage.attr('data-state', "still");
                    animalImage.attr('class', "animalImage");

                    gifDiv.append(p)
                    gifDiv.append(animalImage)

                    $('#animalsView').append(gifDiv);

                }

            });
    };


	function animateClick(){
		var state = $(this).attr('data-state');

		if (state == 'still'){
	        $(this).attr('src', $(this).data('animate'));
	        $(this).attr('data-state', 'animate');
	    }else{
	        $(this).attr('src', $(this).data('still'));
	        $(this).attr('data-state', 'still');
	    }
	};


$(document).on('click', '.animal', animalGif);
$(document).on('click', '.animalImage', animateClick);


});