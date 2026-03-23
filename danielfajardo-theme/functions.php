<?php
/**
 * Theme Functions
 */

if ( ! function_exists( 'danielfajardo_setup' ) ) :
	function danielfajardo_setup() {
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
	}
endif;
add_action( 'after_setup_theme', 'danielfajardo_setup' );

function danielfajardo_scripts() {
    // Fonts
    wp_enqueue_style( 'df-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap', array(), null );

    // CSS Core
    wp_enqueue_style( 'df-variables', get_template_directory_uri() . '/assets/css/variables.css', array(), '1.0' );
    wp_enqueue_style( 'df-base', get_template_directory_uri() . '/assets/css/base.css', array('df-variables'), '1.0' );
    wp_enqueue_style( 'df-utilities', get_template_directory_uri() . '/assets/css/utilities.css', array('df-base'), '1.0' );

    // CSS Components
    wp_enqueue_style( 'df-header', get_template_directory_uri() . '/assets/componentes/header/header.css', array(), '1.0' );
    wp_enqueue_style( 'df-hero', get_template_directory_uri() . '/assets/componentes/hero/hero.css', array(), '1.0' );
    wp_enqueue_style( 'df-portafolio', get_template_directory_uri() . '/assets/componentes/portafolio/portafolio.css', array(), '1.0' );
    wp_enqueue_style( 'df-propuestas', get_template_directory_uri() . '/assets/componentes/propuestas/propuestas.css', array(), '1.0' );
    wp_enqueue_style( 'df-reels', get_template_directory_uri() . '/assets/componentes/reels/reels.css', array(), '1.0' );
    wp_enqueue_style( 'df-contacto', get_template_directory_uri() . '/assets/componentes/contacto/contacto.css', array(), '1.0' );
    wp_enqueue_style( 'df-footer', get_template_directory_uri() . '/assets/componentes/footer/footer.css', array(), '1.0' );
    wp_enqueue_style( 'df-style', get_stylesheet_uri() ); // loads style.css meta

    // JS
    wp_enqueue_script( 'three-js', 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', array(), null, true );
    wp_enqueue_script( 'df-three-scene', get_template_directory_uri() . '/assets/js/three-scene.js', array('three-js'), '1.0', true );
    wp_enqueue_script( 'df-main', get_template_directory_uri() . '/assets/js/main.js', array(), '1.0', true );
}
add_action( 'wp_enqueue_scripts', 'danielfajardo_scripts' );

// Remove wpautop from content if needed since we use raw HTML blocks, but we are using hardcoded templates anyway
remove_filter( 'the_content', 'wpautop' );
remove_filter( 'the_excerpt', 'wpautop' );
?>
