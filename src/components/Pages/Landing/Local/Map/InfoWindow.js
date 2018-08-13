import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';


class InfoWindow extends React.Component {
    
    componentDidUpdate(prevProps){
        if (this.props.map !== prevProps.map){
            this.renderInfoWindow();
        }

        if(this.props.visible !== prevProps.visible || this.props.marker !== prevProps.marker){
            this.props.visible ? this.openWindow() : this.closeWindow();
        }

        if(this.props.children !== prevProps.children){
            this.updateContent();
        }
    }
    
    openWindow = () => {
        this.infowindow
            .open(this.props.map, this.props.marker);
    }
    closeWindow = () => {
        this.infowindow.close();
    }

    renderInfoWindow(){
        let {map, google, mapCenter} = this.props;

        const iw = this.infowindow = new google.maps.InfoWindow({
            content: ''
        })

        console.log('this.infowindow:', this.infowindow);
        
    }
    
    updateContent(){
        const content = this.renderChildren();
        this.infowindow.setContent(content)
    }

    renderChildren(){
        const {children} = this.props;
        console.log('children in iw:'. children);
        
        return ReactDOMServer.renderToString(children);
    }

    render() {
      return null;
    }
  }

export default InfoWindow;