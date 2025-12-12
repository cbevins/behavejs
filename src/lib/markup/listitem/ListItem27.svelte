<script>
    // LitItem with a 9 columns as 2:7
    export let item
</script>

<div class="border-blue-500 bg-blue-100 divide-blue-300 grid grid-cols-9 mx-2 mb-2 divide-x-4 border-4 rounded-2xl">
    <div class='col-span-2 text-center py-1 text-lg font-bold'>
        {item}
    </div>
    <div class='col-span-7 text-left px-4 py-1'>
        <slot>
            ListItem content goes here
        </slot>
    </div>
</div>
