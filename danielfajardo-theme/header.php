<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <?php wp_head(); ?>
</head>
<body <?php body_class("theme-dark"); ?>>
<?php wp_body_open(); ?>
  <!-- Skip Link para Accesibilidad -->
  <a href="#main-content" class="skip-link">Saltar al contenido principal</a>

  <!-- Header -->
  <header class="header" role="banner">
    <div class="container header__container">
      <h1 class="header__logo"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" style="color:inherit; text-decoration:none;">DANIEL FELIPE</a></h1>
      
      <button class="header__toggle" aria-expanded="false" aria-controls="header-nav" aria-label="Alternar menú">
        <span class="header__toggle-icon"></span>
      </button>
      
      <nav class="header__nav" role="navigation" id="header-nav">
        <ul class="header__menu">
          <li class="header__menu-item"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="header__link">Inicio</a></li>
          <li class="header__menu-item"><a href="<?php echo esc_url( home_url( '/servicios' ) ); ?>" class="header__link">Servicios</a></li>
          <li class="header__menu-item"><a href="<?php echo esc_url( home_url( '/propuestas' ) ); ?>" class="header__link">Propuestas</a></li>
          <li class="header__menu-item"><a href="<?php echo esc_url( home_url( '/portafolio' ) ); ?>" class="header__link">Portfolio</a></li>
          <li class="header__menu-item"><a href="<?php echo esc_url( home_url( '/contacto' ) ); ?>" class="header__link">Contacto</a></li>
        </ul>
      </nav>
    </div>
  </header>
