import React, {Component} from 'react';
import {Platform, View} from 'react-native';
import PropTypes from 'prop-types'
import {
    Entypo,
    EvilIcons,
    Feather,
    FontAwesome,
    Foundation,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    Octicons,
    SimpleLineIcons,
    Zocial
} from '@expo/vector-icons';

export default class IconPlatform extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    };

    static defaultProps = {
        name: '',
        type: ''
    };

    state = {
        iconComponents: {
            Ionicons: () => {
                return (<Ionicons {...this.props} name={this.generateFinalName(this.props.name)}/>)
            },
            MaterialCommunityIcons: () => {
                return (<MaterialCommunityIcons {...this.props} name={this.generateFinalName(this.props.name)}/>)
            },
            Entypo: () => {
                return (<Entypo {...this.props} name={this.generateFinalName(this.props.name)}/>)
            },
            EvilIcons: () => {
                return (<EvilIcons {...this.props} name={this.generateFinalName(this.props.name)}/>)
            },
            Feather: () => {
                return (<Feather {...this.props} name={this.generateFinalName(this.props.name)}/>)
            },
            FontAwesome: () => {
                return (<FontAwesome {...this.props} name={this.generateFinalName(this.props.name)}/>)
            },
            Foundation: () => {
                return (<Foundation {...this.props} name={this.generateFinalName(this.props.name)}/>)
            },
            MaterialIcons: () => {
                return (<MaterialIcons {...this.props} name={this.generateFinalName(this.props.name)}/>)
            },
            SimpleLineIcons: () => {
                return (<SimpleLineIcons {...this.props} name={this.generateFinalName(this.props.name)}/>)
            },
            Octicons: () => {
                return (<Octicons {...this.props} name={this.generateFinalName(this.props.name)}/>)
            },
            Zocial: () => {
                return (<Zocial {...this.props} name={this.generateFinalName(this.props.name)}/>)
            }
        }
    };

    generateFinalName(name) {
        return Platform.OS === 'ios' ? `ios-${name}` : `md-${name}`;
    }

    render() {
        const {iconComponents} = this.state;
        const {type} = this.props;
        const PlatformIcon = iconComponents[type];

        return (
            <View>
                <PlatformIcon/>
            </View>
        )
    }
}
