<script>
    // ListItem with a 1:9 column layout
    export let item
</script>

<div class="grid grid-cols-12 mx-4 mb-2">
    <div class='col-span-1 text-left py-1 text-lg font-normal'>
        {item}
    </div>
    <div class='col-span-11 text-left px-0 py-1'>
        <slot>
            ListItem content goes here
        </slot>
    </div>
</div>
