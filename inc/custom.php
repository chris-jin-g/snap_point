<?php
//get site url so links work on local
function siteURL() {
echo get_site_url();
}

/**
 * Add support for custom color palettes in Gutenberg.
 */
function jr_gutenberg_color_palette() {
  // Disable Custom Colors
	add_theme_support( 'disable-custom-colors' );

	add_theme_support(
		'editor-color-palette', array(
			array(
				'name'  => esc_html__( 'Primary', '@@textdomain' ),
				'slug' => 'primary',
				'color' => '#c4a67c',
			),
			array(
				'name'  => esc_html__( 'Secondary', '@@textdomain' ),
				'slug' => 'secondary',
				'color' => '#7daed3',
			),
      array(
				'name'  => esc_html__( 'Tertiary', '@@textdomain' ),
				'slug' => 'tertiary',
				'color' => '#f4f5f7',
			),
      array(
				'name'  => esc_html__( 'White', '@@textdomain' ),
				'slug' => 'white',
				'color' => '#ffffff',
			),array(
				'name'  => esc_html__( 'Light Gray', '@@textdomain' ),
				'slug' => 'light-gray',
				'color' => '#DEDEDE',
			),array(
				'name'  => esc_html__( 'Medium Gray', '@@textdomain' ),
				'slug' => 'med-gray',
				'color' => '#dee2e6',
			),array(
				'name'  => esc_html__( 'Medium Dark Gray', '@@textdomain' ),
				'slug' => 'med-dark-gray',
				'color' => '#495057',
			),array(
				'name'  => esc_html__( 'Dark Gray', '@@textdomain' ),
				'slug' => 'dark-gray',
				'color' => '#292c34',
			),array(
				'name'  => esc_html__( 'Black', '@@textdomain' ),
				'slug' => 'black',
				'color' => '#000000',
			)
		)
	);
}
add_action( 'after_setup_theme', 'jr_gutenberg_color_palette' );

gravity_form_enqueue_scripts( 1, true );
