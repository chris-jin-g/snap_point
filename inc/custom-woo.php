<?php

// Woocommerce Theme Support
add_theme_support( 'woocommerce' );

// add_theme_support( 'wc-product-gallery-zoom' );
// add_theme_support( 'wc-product-gallery-lightbox' );
// add_theme_support( 'wc-product-gallery-slider' );

// Remove styles from woocommerce
add_filter( 'woocommerce_enqueue_styles', 'jonroc_dequeue_styles' );
function jonroc_dequeue_styles( $enqueue_styles ) {
	unset( $enqueue_styles['woocommerce-layout'] );		// Remove the layout
	return $enqueue_styles;
}

// //remove add to cart button from shop
// remove_action('woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart');
// //remove price from shop
// remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10 );

//remove woocommerce tabs on single
remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );

add_filter('woocommerce_show_page_title', '__return_null');

// overwrite existing output content wrapper function
add_action('woocommerce_before_main_content', 'woocommerce_output_content_wrapper');
function woocommerce_output_content_wrapper() {
	echo '<div class="container">';
}

add_action('woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end');
function woocommerce_output_content_wrapper_end() {
		echo '</div><!-- Close Container -->';
}

//Change several of the breadcrumb defaults (Does not work?)
// add_filter( 'woocommerce_breadcrumb_defaults', 'jk_woocommerce_breadcrumbs' );
// function jk_woocommerce_breadcrumbs() {
//     return array(
//             'delimiter'   => ' &#47; ',
//             'wrap_before' => '<nav class="woocommerce-breadcrumb container" itemprop="breadcrumb">',
//             'wrap_after'  => '</nav>',
//             'before'      => '',
//             'after'       => '',
//             'home'        => _x( 'Home', 'breadcrumb', 'woocommerce' ),
//         );
// }

/**
 * Replace the home link URL
 */

add_filter( 'woocommerce_breadcrumb_home_url', 'woo_custom_breadrumb_home_url' );
function woo_custom_breadrumb_home_url() {
		$shop_page_url = get_permalink( woocommerce_get_page_id( 'shop' ) );
    return $shop_page_url;
}

/**
 * Rename "home" in breadcrumb
 */
add_filter( 'woocommerce_breadcrumb_defaults', 'wcc_change_breadcrumb_home_text' );
function wcc_change_breadcrumb_home_text( $defaults ) {
  $shop_page_title = get_the_title( woocommerce_get_page_id( 'shop' ) );
	$defaults['home'] = $shop_page_title;
	return $defaults;
}

function remove_hook(){
//remove display notice - Showing all x results
remove_action( 'woocommerce_before_shop_loop', 'woocommerce_result_count', 20 );

//remove default sorting drop-down from WooCommerce
// remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );

// Remove the breadcrumbs
remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20, 0 );
remove_action( 'woocommerce_archive_description', 'woocommerce_taxonomy_archive_description', 10 );

}
add_action( 'init', 'remove_hook', 1 );

//remove singel product link on image
function jr_remove_product_image_link( $html, $post_id ) {
    return preg_replace( "!<(a|/a).*?>!", '', $html );
}
add_filter( 'woocommerce_single_product_image_thumbnail_html', 'jr_remove_product_image_link', 10, 2 );

////change text of related products
// function custom_related_products_text( $translated_text, $text, $domain ) {
//   switch ( $translated_text ) {
//     case 'Related products' :
//       $translated_text = __( 'Related Products', 'woocommerce' );
//       break;
//   }
//   return $translated_text;
// }
// add_filter( 'gettext', 'custom_related_products_text', 20, 3 );

/**
 * Change number of related products output
 */
function woo_related_products_limit() {
  global $product;

	$args['posts_per_page'] = 6;
	return $args;
}
add_filter( 'woocommerce_output_related_products_args', 'jk_related_products_args', 20 );
  function jk_related_products_args( $args ) {
	$args['posts_per_page'] = 3; // 4 related products
	return $args;
}

//add_filter( 'woocommerce_checkout_fields' , 'custom_remove_woo_checkout_fields' );

//function custom_remove_woo_checkout_fields( $fields ) {

    // remove billing fields
    //unset($fields['billing']['billing_first_name']);
    //unset($fields['billing']['billing_last_name']);
    // unset($fields['billing']['billing_company']);
    // unset($fields['billing']['billing_address_1']);
    // unset($fields['billing']['billing_address_2']);
    // unset($fields['billing']['billing_city']);
    // unset($fields['billing']['billing_postcode']);
    // unset($fields['billing']['billing_country']);
    // unset($fields['billing']['billing_state']);
    // unset($fields['billing']['billing_phone']);
    //unset($fields['billing']['billing_email']);

    // remove shipping fields
    // unset($fields['shipping']['shipping_first_name']);
    // unset($fields['shipping']['shipping_last_name']);
    // unset($fields['shipping']['shipping_company']);
    // unset($fields['shipping']['shipping_address_1']);
    // unset($fields['shipping']['shipping_address_2']);
    // unset($fields['shipping']['shipping_city']);
    // unset($fields['shipping']['shipping_postcode']);
    // unset($fields['shipping']['shipping_country']);
    // unset($fields['shipping']['shipping_state']);

    // remove order comment fields
    //unset($fields['order']['order_comments']);

		// Removes Order Notes Title - Additional Information & Notes Field
		//add_filter( 'woocommerce_enable_order_notes_field', '__return_false', 9999 );

    //return $fields;
//}
