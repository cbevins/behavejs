export class Behave {
    export constructor(desc='Behave DAG') {
        this.desc = desc
        this.dag1 = null    // full Dag for current configuration
        this.dag2 = null    // trimmed Dag for current output node list
        this.configs = [
            {key: 'Surface Fuel Parameter Source', selected: '',
                options: [
                    {key: 'key1', desc: 'Fuel Model Key'},
                    {key: 'key2', desc: 'Two Fuel Model Keys'},
                    {key: 'input', desc: 'Input all parameters'},
                    {key: 'chaparral', desc: 'Estimate from chaparral stand parameters'},
                    {key: 'aspen', desc: 'Estimate from aspen stand parameters'},
                ]
            }
        ]
    }
}