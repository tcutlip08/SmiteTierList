import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Landing.css";

class Landing extends Component {
  render() {
    return (
      <div id="content-section">
        <div id="tierlist">
          <div id="new-container" class="tiercontainer">
            <div class="tier-label new">new</div>
            <div id="new" class="tier new ui-droppable">
              Empty
            </div>
          </div>
          <div id="ss-container" class="tiercontainer">
            <div class="tier-label ss">SS</div>
            <div id="ss" class="tier ss ui-droppable">
              Empty
            </div>
          </div>
          <div class="tiercontainer">
            <div class="tier-label splus">S+</div>
            <div id="splus" class="tier splus ui-droppable">
              Empty
            </div>
          </div>
          <div class="tiercontainer">
            <div class="tier-label s">S</div>
            <div id="s" class="tier s ui-droppable">
              Empty
            </div>
          </div>
          <div class="tiercontainer">
            <div class="tier-label aplus">A+</div>
            <div id="aplus" class="tier aplus ui-droppable">
              Empty
            </div>
          </div>
          <div class="tiercontainer">
            <div class="tier-label a">A</div>
            <div id="a" class="tier a ui-droppable">
              Empty
            </div>
          </div>
          <div class="tiercontainer">
            <div class="tier-label bplus">B+</div>
            <div id="bplus" class="tier bplus ui-droppable">
              Empty
            </div>
          </div>
          <div class="tiercontainer">
            <div class="tier-label b">B</div>
            <div id="b" class="tier b ui-droppable">
              Empty
            </div>
          </div>
          <div class="tiercontainer">
            <div class="tier-label c">C</div>
            <div id="c" class="tier c ui-droppable">
              Empty
            </div>
          </div>
          <div class="tiercontainer">
            <div class="tier-label d">D</div>
            <div id="d" class="tier d ui-droppable">
              Empty
            </div>
          </div>
          <div id="gods" class="ui-droppable">
            <div
              id="achilles-container"
              class="ui-draggable ui-draggable-handle"
            >
              <div class="change">&nbsp;</div>
              <img
                src="http://www.smitetierlist.com/gods/achilles.jpg"
                id="achilles"
                class="godimage tooltipstered"
                data-name="Achilles"
                data-class="Warrior"
              />
            </div>
            <div id="lastupdated">Last Updated: 2019-11-14 10:52:25</div>
          </div>
          <div id="blog"></div>
        </div>
      </div>
    );
  }
}

export default Landing;
