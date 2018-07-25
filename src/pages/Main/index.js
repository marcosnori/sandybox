import React, { Component, Fragment } from 'react';
import { bindActionCreators }         from 'redux'
import { connect }                    from 'react-redux'
import * as sandyboxActions           from '../../actions/sandybox'

import Preview                        from '../../components/Preview'
import Html                           from '../../components/Html'
import Css                            from '../../components/Css'
import Js                             from '../../components/Js'
import Loading                        from '../../components/Loading'

import 'codemirror/lib/codemirror.css'
import './code-theme/dracula.css'
import './main.css'

class Main extends Component {
    constructor(props) {
		super(props)
		this.port     = 3000;
		this.baseUrl  = this.getBaseUrl()
        this.fileName = 'index'
        this.state    = {
            arrayFiles : [
                {'file' : 'html', 'url' : `${this.baseUrl}{hash}/${this.fileName}.html` },
                {'file' : 'css',  'url' : `${this.baseUrl}{hash}/${this.fileName}.css` },
                {'file' : 'js',   'url' : `${this.baseUrl}{hash}/${this.fileName}.js` }
            ]
        }
	}
	getBaseUrl(){
		if (window.location.hostname === "localhost")
			return `http://localhost:${this.port}/codes/`
		else
			return `https://diogocezar.github.io/sandybox/codes/`
	}
    componentDidMount(){
        this.loadFiles(this.props.match.params.id)
    }
    loadFiles = (hash) => {
        try{
            Promise.all(
                this.state.arrayFiles.map(
                    item => fetch(item.url.replace('{hash}', hash))
                        .then(response => response.text())
                        .then(text => {
                            switch(item.file){
                                case 'html' : this.props.setHtml(text);  break;
                                case 'js'   : this.props.setJs(text);    break;
                                case 'css'  : this.props.setCss(text);   break;
                                default: console.log('Item not found.'); break;
                            }
                        }
                    )
                )
            )
        }
        catch(err){
            console.log(err)
        }
    }
    render() {
        if(this.props.sandybox.html && this.props.sandybox.css && this.props.sandybox.js){
            return (
                <Fragment>
                    <Preview />
                    <div className="editors">
                        <Css />
                        <Html />
                        <Js />
                    </div>
                </Fragment>
            )
        }
        else{
            return(
				<Loading />
            )
        }
    }
}

const mapStateToProps    = state    => state
const mapDispatchToProps = dispatch => bindActionCreators(sandyboxActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)