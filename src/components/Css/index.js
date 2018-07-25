import React, { Component, Fragment } from 'react';

import { bindActionCreators }         from 'redux'
import { connect }                    from 'react-redux'

import * as sandyboxActions           from '../../actions/sandybox'

import './css.css'
import 'codemirror/lib/codemirror.css'

var CodeMirror = require('react-codemirror')

require('codemirror/mode/css/css');

class Css extends Component {
    changeCss = (newCode) => {
        this.props.setCss(newCode)
    }
    render() {
        var options = {
            lineNumbers: true,
            mode: 'css'
        };
        return (
            <Fragment>
                <CodeMirror value={this.props.sandybox.css} onChange={this.changeCss} options={options}/>
            </Fragment>
        );
    }
}

const mapStateToProps    = state    => state
const mapDispatchToProps = dispatch => bindActionCreators(sandyboxActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Css)