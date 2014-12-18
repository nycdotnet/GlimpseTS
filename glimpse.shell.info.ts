// glimpse.shell.info.js
(function($, pubsub, elements, data, util) {
    var wireListeners = function () { 
            elements.barHolder().find('.glimpse-icon').click(function () { pubsub.publish('trigger.tab.select.info', { key: 'info' }); }); 
        },  
        buildHelp = function(options) { 
            var info = data.currentMetadata().plugins[options.key],
                url = info && info.documentationUri; 
            
            elements.barHolder().find('.glimpse-meta-help').toggle(url != null).attr('href', url); 
        }, 
        buildInfo = function(args) { 
            var metadata = data.currentMetadata(); 
            args.panel.html('<div class="glimpse-info-title"><a href="http://getGlimpse.com/" target="_blank"><img border="0" src="' + util.uriTemplate(data.currentMetadata().resources.glimpse_logo) + '" /></a></div><div>v' + metadata.version + '</div><div class="glimpse-info-quote">"What Firebug is for the client, Glimpse is for the server"</div><div class="glimpse-info-more">Go to your Glimpse Config page <a href="' + util.uriTemplate(data.currentMetadata().resources.glimpse_config) + '" target="_blank">Glimpse.axd</a></div><div class="glimpse-info-more">For more info see <a href="http://getGlimpse.com" target="_blank">http://getGlimpse.com</a></div><div style="margin:1.5em 0 0.5em;">Created by <strong>Anthony van der Hoorn</strong> (<a href="http://twitter.com/anthony_vdh" target="_blank">@anthony_vdh</a>) and <strong>Nik Molnar</strong> (<a href="http://twitter.com/nikmd23" target="_blank">@nikmd23</a>) &nbsp; - &copy; getglimpse.com 2011</div><div>Have a <em>feature</em> request? <a href="http://getglimpse.uservoice.com" target="_blank">Submit the idea</a>. &nbsp; &nbsp;Found an <em>error</em>? <a href="https://github.com/glimpse/glimpse/issues" target="_blank">Help us improve</a>. &nbsp; &nbsp;Have a <em>question</em>? <a href="http://twitter.com/#search?q=%23glimpse" target="_blank">Tweet us using #glimpse</a>. &nbsp; &nbsp;Want to <em>help</em>? <a href="groups.google.com/group/getglimpse-dev" target="_blank">Join our developer mailing list</a>.</div>');
        },
        setupInfo = function(args) { 
            args.newData.data.info = { name: 'info', data: 'Loading...', suppressTab: true, isPermanent: true };
            args.newData.metadata.plugins.info = {};
        };
    
    pubsub.subscribe('trigger.shell.subscriptions', wireListeners); 
    pubsub.subscribe('action.panel.rendered.info', buildInfo);  
    pubsub.subscribe('action.data.initial.changed', setupInfo); 
    pubsub.subscribe('action.panel.showing', buildHelp); 
})(jQueryGlimpse, glimpse.pubsub, glimpse.elements, glimpse.data, glimpse.util);
