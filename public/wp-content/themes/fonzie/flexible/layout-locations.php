<?php if( have_rows('locations') ): ?>

        <div class="panel-group" id="locations" role="tablist" aria-multiselectable="true">

            <?php $i = 0; ?>

            <?php while ( have_rows('locations') ) : the_row(); ?>

                <?php $i++;  ?>

                <div class="panel panel-location">
                    <div class="panel-heading<?php echo ($i == 1)? ' active' : ''; ?>" role="tab">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#locations" href="#location<?php echo $i; ?>" aria-expanded="<?php echo ($i == 1)? 'true' : 'false'; ?>">
                                <?php echo get_sub_field('name'); ?>
                                <span class="toggle-indicator">
                                    <span class="icon-plus"><?php include ( fonzie_svg_path( 'plus.svg' ) ); ?></span>
                                    <span class="icon-minus"><?php include ( fonzie_svg_path( 'minus.svg' ) ); ?></span>
                                </span>
                            </a>
                        </h4>
                    </div>
                    <div id="location<?php echo $i; ?>" class="panel-collapse collapse<?php echo ($i == 1)? ' in' : ''; ?>">
                        <div class="panel-body">
                            <div class="location-address"><?php echo get_sub_field('address'); ?></div>

                            <?php
                            if( get_sub_field('phone_number') || get_sub_field('fax_number') ):
                                $phone = preg_replace("/[^0-9,.]/", "", get_sub_field('phone_number') );
                                $fax = preg_replace("/[^0-9,.]/", "", get_sub_field('fax_number') );
                            endif;
                            ?>

                            <?php if( get_sub_field('email') ): ?>
                                <?php $email = antispambot( get_sub_field('email') ); ?>
                                <div>
                                    <div class="location-info--label"><?php _e('Email'); ?></div>
                                    <div class="location-info--field">
                                        <a href="mailto:<?php echo $email; ?>"><?php echo $email; ?></a>
                                    </div>
                                </div>
                            <?php endif; ?>

                            <?php if( get_sub_field('phone_number') && get_sub_field('fax_number') ): ?>
                                <div class="twin-info">
                                    <div>
                                        <div class="location-info--label"><?php _e('Phone'); ?></div>
                                        <div class="location-info--field">
                                            <a href="tel:<?php echo $phone; ?>"><?php echo get_sub_field('phone_number');
                                                ?></a>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="location-info--label"><?php _e('Fax'); ?></div>
                                        <div class="location-info--field">
                                            <a href="fax:<?php echo $fax; ?>"><?php echo get_sub_field('fax_number');
                                                ?></a>
                                        </div>
                                    </div>
                                </div>
                            <?php elseif( get_sub_field('phone_number') || get_sub_field('fax_number') ): ?>
                                <?php if( get_sub_field('phone_number') ): ?>
                                    <div>
                                        <div class="location-info--label"><?php _e('Phone'); ?></div>
                                        <div class="location-info--field">
                                            <a href="tel:<?php echo $phone; ?>"><?php echo get_sub_field('phone_number');
                                                ?></a>
                                        </div>
                                    </div>
                                <?php elseif( get_sub_field('fax_number') ): ?>
                                    <div>
                                        <div class="location-info--label"><?php _e('Fax'); ?></div>
                                        <div class="location-info--field">
                                            <a href="fax:<?php echo $fax; ?>"><?php echo get_sub_field('fax_number'); ?></a>
                                        </div>
                                    </div>
                                <?php endif; ?>
                            <?php endif; ?>

                        </div>
                    </div>
                </div>

            <?php endwhile; ?>

        </div>

<?php endif; ?>
