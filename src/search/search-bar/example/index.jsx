const SearchBar = FocusComponents.search.searchBar.component;
const QuickSearchStore = Focus.store.SearchStore.QuickSearch;
const actionBuilder = Focus.search.actionBuilder;

const searchBarStore = new QuickSearchStore({identifier: 'QUICK_SEARCH_1'});
const searchBarWithScopesStore = new QuickSearchStore({identifier: 'QUICK_SEARCH_2'});

const SearchBarExample = React.createClass({
    render() {
        return(
            <div>
                <center>
                    <h3>Example of a search without scopes</h3>
                </center>
                <MySearchBarWithoutScopes />

                <br/>
                <center>
                    <h3>Example of a search with scopes</h3>
                    <h6>The prop <b>hasScopes</b> is, by default, set to true so don't forget to define your different scopes.</h6>
                </center>
                <MySearchBarWithScopes />
            </div>
        );
    }
});

const MySearchBarWithoutScopes = React.createClass({
    MyFunction() {
        setTimeout(() => {
            this.refs.searchBar.setState({loading: false});
        }, 1700);
    },
    componentWillMount() {
        this._action = actionBuilder({
            service: this.props.service,
            identifier: searchBarStore.identifier,
            getSearchOptions: () => {return searchBarStore.getValue.call(searchBarStore); }
        });
        searchBarStore.addQueryChangeListener(this._onQueryChangeFromStore);
    },
    _onQueryChangeFromStore() {
        this.setState({
            query: searchBarStore.getQuery()
        });
        this.MyFunction();
    },
    render() {
    console.log(this);
        return(
            <div>
                <SearchBar
                    hasScopes={false}
                    store={searchBarStore}
                    placeholder={`Enter your search here...`}
                    action={this._action}
                    ref='searchBar'
                    />
            </div>
        );
    }
});

const MySearchBarWithScopes = React.createClass({
    MyFunction() {
        setTimeout(() => {
            this.refs.searchBarScopes.setState({loading: false});
        }, 1700);
    },
    componentWillMount() {
        this._action = actionBuilder({
            service: this.props.service,
            identifier: searchBarWithScopesStore.identifier,
            getSearchOptions: () => {return searchBarWithScopesStore.getValue.call(searchBarWithScopesStore); } // Binding the store in the function call
        });
        searchBarWithScopesStore.addQueryChangeListener(this._onQueryChangeFromStore);
    },
    _onQueryChangeFromStore() {
        this.setState({
            query: searchBarWithScopesStore.getQuery()
        });
        this.MyFunction();
    },
    render() {
        const searchBarScopes = [
            {
                code: 'movie',
                label: 'Movies'
            },
            {
                code: 'audiotrack',
                label: 'Music'
            },
            {
                code: 'devices other',
                label: 'Devices'
            },
            {
                code: 'collections',
                label: 'Photos'
            },
        ];
        return(
            <div>
                <SearchBar
                    scopes={searchBarScopes}
                    store={searchBarWithScopesStore}
                    placeholder={`Enter your search here...`}
                    ref='searchBarScopes'
                    action={this._action}
                    />
            </div>
        );
    }
});

module.exports = SearchBarExample;
