App = {
    web3Provider: null,
    contracts: {},
    userAccount: null,
    csvFile:null,

    init: function () {
        return App.initWeb3();
    },

    initWeb3: function () {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:9545');
        }
        web3 = new Web3(App.web3Provider);
        App.userAccount = web3.eth.accounts[0];
        return App.initContract();
    },

    initContract: function () {
        $.getJSON('BatchTransferWallet.json', function (data) {
            const walletArtifact = data;
            App.contracts.wallet = TruffleContract(walletArtifact);
            App.contracts.wallet.setProvider(App.web3Provider);
            return App.render();
        });
    },

    render: function (adopters, account) {
        App.contracts.wallet.deployed().then(function (instance) {
            let walletInstance = instance;
            App.bindEvents();
        })
    },
    bindEvents: function () {
        $(document).on('click', '#csv-import-btn', App.csvImport);
        $(document).on('click', '#balance-btn', App.balance);
        $(document).on('change',"#importForm input[name='csv']",App.fileUpload);
    },
    csvImport : function () {
        $("#txStatus").empty();
        $("#txStatus").append(`
                    <div class="ui icon message">
                      <i class="notched circle loading icon"></i>
                      <div class="content">
                          Wait for transaction end
                    </div>`);
        console.log($("#importForm input[name='contract-address']")[0].value);
        if (!App.csvFile) {
            //TODO: error handling
            return
        }
        let contractAddress = $("#importForm input[name='contract-address']")[0].value;
        //csv format is "address,amount"
        let addresses = App.csvFile.split("\n").map(function (value) {
            return value.split(",")[0]
        });
        let amounts = App.csvFile.split("\n").map(function (value) {
            return parseInt(value.split(",")[1])
        });
        console.log(addresses)
        console.log(amounts)
        App.contracts.wallet.deployed().then(function (instance) {
            instance.batchTransfer(contractAddress,addresses,amounts, {
                from: App.userAccount,
            }).then(function (receipt) {
                $("#txStatus").empty();
                $("#txStatus").append(`
                    <div class="ui positive message"> success </div>
                    `);
            })
                .catch(function (error) {
                    $("#txStatus").empty();
                    $("#txStatus").append(`
                    <div class="ui negative message">${error} </div>
                    `);
                });
        })
    },

    balance : function () {
        let contractAddress = $("#balanceForm input[name='contract-address']")[0].value;
        App.contracts.wallet.deployed().then(function (instance) {
            console.log(instance);
            instance.balanceOfContract.call(contractAddress,App.userAccount ).then(function (balance) {

                let balanceElement = $("#balance")[0];
                // balanceElement.empty();
                balanceElement.append(balance.toString());
            })
        })
    },

    fileUpload : function (e) {
        let file = e.target.files[0];
        var reader = new FileReader();

        reader.readAsText( file );
        reader.addEventListener( 'load', function() {
            console.log(reader.result);
            App.csvFile= reader.result;
        })
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});