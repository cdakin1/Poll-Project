Momentum.registerPlugin('slide-height-fade', function(options) {
	options = _.extend({
		duration: 300,
		delay: 0,
		easing: 'ease-in-out'
	}, options);

	return {
		insertElement: function(node, next, done) {
			var $node = $(node);

			$node
				.insertBefore(next)
				.css('height', $node.height()) // set explicit height
				.velocity("fadeOut", {
					duration: 0,
					queue: false
				})
				.velocity('slideDown', {
					easing: options.easing,
					duration: options.duration
				})
				.velocity("fadeIn", {
					duration: 250,
					complete: function() {
						$node.css('height', ''); // remove explicit height
						done();
					}
				});
		},
		removeElement: function(node, done) {
			var $node = $(node);
			$node
				.css('height', $node.height()) // set explicit height
				.velocity("fadeOut", {
					duration: 250
				})
				.velocity('slideUp', {
					easing: options.easing,
					duration: 300,
					queue: false,
					complete: function() {
						$node.remove();
						done();
					}
				});
		}
	};
});