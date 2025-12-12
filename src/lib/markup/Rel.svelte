<script>
    export let node
    export let rel = true       // add relationship superscript
    export let life = true      // add life span
    
    function superHtml() {
        if (!gen) return 'Off'
        if (gen===1) return `<sup>Par</sup>`
        if (gen===2) return `<sup>GP</sup>`
        if (gen===3) return `<sup>1<sup>st</sup>GGP</sup>`
        if (gen===4) return `<sup>2<sup>nd</sup>GGP</sup>`
        if (gen===5) return `<sup>3<sup>rd</sup>GGP</sup>`
        return `<sup>{gen-2}<sup>th</sup>GGP</sup>`
    }

    const {person, father, mother, child, gen, seq} = node
    const prefix = person.namePrefix()
    const given = person.nameGiven()
    const surnames = person.nameSurnames()
    // const suffix = person.nameSuffixNoSeq()
    const fullName = [prefix, given, surnames].join(' ')

    // const isFemale = person.isFemale()
    // const isDeceased = person.isDeceased()
    // const isImmigrant = person.isImmigrant()
    // const fileId = person.fileId()

    const lifeSpan = person.lifeSpan()
    // const birthCountry = person.birthCountry()
    // const birthYear = person.birthYear()
    // const deathYear = person.deathYear()
    // const deathCountry = person.deathCountry()
    // const ageStr = person.ageString()
</script>

<span class='font-bold'>{fullName}</span>
{#if rel}{@html superHtml()}{/if}
{#if life}{lifeSpan}{/if}