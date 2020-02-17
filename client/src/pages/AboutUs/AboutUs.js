import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./AboutUs.css";

class AboutUs extends Component {
  render() {
    return (
      <div id="legend">
        <div>
          <span class="tier-label round ss">SS</span>
          <p>
            This tier comprised "god" tiered characters which have the innate
            ability to be placed onto any team, with any comp, and carry alone.
            Only a handful of gods have ever reached SS.
          </p>
        </div>
        <div>
          <span class="tier-label round splus">S+</span>
          <p>
            Your quintessential top tiers, which will generally dictate meta
            stylings and composition. These gods are usually first pick / first
            ban material.
          </p>
        </div>
        <div>
          <span class="tier-label round s">S</span>
          <p>
            Slightly above the point balance, this pool of gods should comprise
            the team compositions for most competitive games. The ebb and flow
            of meta swing and flavors of the month may sway this slightly in
            favor of certain players' abilities and strengths.
          </p>
        </div>
        <div>
          <span class="tier-label round a">A</span>
          <p>
            The focal point of balance. These gods should see no changes, given
            their current abilities in competitive high level play. New players
            should flock to this pool, as their time invested will likely not be
            wasted due to nerfs, buffs or changes to the playstyle.
          </p>
        </div>
        <div>
          <span class="tier-label round b">B</span>
          <p>
            Still somewhat strong, but not competitively viable in all
            situations. Are generally a bit more difficult to place on a team
            than A or S tiered gods. High player skill with individuals in this
            pool is likely to still sway a match up in your favor, but there are
            generally better picks.
          </p>
        </div>
        <div>
          <span class="tier-label round c">C</span>
          <p>
            Weak, overall. The team composition generally will need to be built
            around a character in this pool to make them work properly. Unlikely
            to be found in competitive environments, unless the player is
            considered a master of a god.
          </p>
        </div>
        <div>
          <span class="tier-label round d">D</span>
          <p>
            Very low pick rate and or competitively non-viable even in the hands
            of masters.
          </p>
        </div>
      </div>
    );
  }
}

export default AboutUs;
