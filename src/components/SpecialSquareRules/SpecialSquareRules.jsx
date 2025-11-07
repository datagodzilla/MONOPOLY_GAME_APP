/**
 * Special Square Rules Component
 * Displays detailed rules, scenarios, and tips for special white card squares
 */

import './SpecialSquareRules.css';

const SpecialSquareRules = ({ square }) => {
  const getSpecialSquareRules = (square) => {
    if (!square) return null;

    const rulesMap = {
      'GO': {
        icon: '🚀',
        title: 'GO - Start Space',
        mainRules: [
          'Collect $200 when you land directly on GO',
          'Collect $200 when you pass GO during your turn',
          'You can collect GO money multiple times in one turn if using special dice'
        ],
        scenarios: [
          {
            title: 'Landing on GO',
            description: 'You collect $200, same as passing it'
          },
          {
            title: 'Passing GO',
            description: 'Each time you pass GO, collect $200 from the Bank'
          },
          {
            title: 'Mr. Monopoly or Bus Ticket',
            description: 'If you pass GO using special movement, you still collect $200'
          },
          {
            title: '🎲 If You Rolled Doubles',
            description: 'Collect your $200, then roll again! You get to keep moving and might pass GO again for another $200.'
          }
        ],
        tips: [
          'GO is your best friend - you\'ll always get paid!',
          'In Mega Monopoly, some cards may give you double GO money',
          'You can never lose money on GO space'
        ]
      },
      'Jail / Just Visiting': {
        icon: '🏛️',
        title: 'Jail / Just Visiting',
        mainRules: [
          'If you land here by normal dice roll, you are "Just Visiting"',
          'Just Visiting has no penalty - you\'re safe here',
          'If sent to Jail by "Go To Jail" space or card, you are IN Jail'
        ],
        scenarios: [
          {
            title: 'Just Visiting (Safe)',
            description: 'You landed here naturally. No penalties, continue playing normally next turn'
          },
          {
            title: 'Sent to Jail',
            description: 'You must go directly to Jail if: (1) You land on "Go To Jail" space, (2) Chance/Community Chest card sends you, (3) You roll doubles three times in a row'
          },
          {
            title: 'Getting Out of Jail',
            description: 'Three ways: (1) Pay $50 fine before rolling, (2) Use "Get Out of Jail Free" card, (3) Roll doubles on your turn (max 3 attempts)'
          },
          {
            title: '🎲 If You Rolled Doubles (Just Visiting)',
            description: 'You\'re safe! Take your turn normally and roll again. Doubles only matter if you\'re SENT to Jail (then you forfeit the extra roll).'
          }
        ],
        tips: [
          'Being in Jail late in the game can be strategic - you avoid landing on expensive properties!',
          'You can still collect rent while in Jail',
          'If you don\'t roll doubles after 3 turns, you MUST pay $50 and move with your last roll'
        ]
      },
      'Go To Jail': {
        icon: '👮',
        title: 'Go To Jail',
        mainRules: [
          'Go directly to Jail - do not pass GO',
          'Do not collect $200',
          'Move your token directly to the Jail space',
          'Your turn ends immediately'
        ],
        scenarios: [
          {
            title: 'What Happens',
            description: 'Move directly to Jail (position 10). Your turn ends. You do NOT collect $200 for passing GO'
          },
          {
            title: 'Next Turn Options',
            description: 'On your next turn, choose: (1) Pay $50 before rolling, (2) Use "Get Out of Jail Free" card, or (3) Try to roll doubles (3 attempts maximum)'
          },
          {
            title: 'Rolling Doubles in Jail',
            description: 'If you roll doubles, you get out immediately and move that number of spaces. You don\'t get another turn even though you rolled doubles'
          },
          {
            title: '🎲 CRITICAL: If You Rolled Doubles',
            description: '⚠️ EXCEPTION TO DOUBLES RULE! Even if you rolled doubles, you do NOT get to roll again. Your turn ends immediately. This also applies if you had Mr. Monopoly, Bus, or Chance on the Speed Die - you forfeit all special actions.'
          }
        ],
        tips: [
          'This is the only space where you don\'t collect GO money when passing it',
          'Early game: Get out quickly to buy properties. Late game: Sometimes staying in Jail is safer!',
          'Save your "Get Out of Jail Free" cards for strategic moments',
          'Go To Jail is the ONLY square that cancels your doubles roll - remember this!'
        ]
      },
      'Chance': {
        icon: '❓',
        title: 'Chance',
        mainRules: [
          'Draw the top card from the Chance deck',
          'Follow the instructions on the card immediately',
          'Return the card to the bottom of the deck (unless it\'s "Get Out of Jail Free")',
          'Some cards may move you to different spaces'
        ],
        scenarios: [
          {
            title: 'Movement Cards',
            description: 'Cards like "Advance to GO" or "Go to Illinois Avenue" move you immediately. If you pass GO, collect $200'
          },
          {
            title: 'Money Cards',
            description: 'Some cards give you money (like "Bank pays dividend") or make you pay (like "Repairs on properties")'
          },
          {
            title: 'Get Out of Jail Free',
            description: 'Keep this card until needed. You can also sell it to another player for an agreed price'
          },
          {
            title: 'Property Repairs',
            description: 'Some cards charge per house/hotel you own (e.g., $25 per house, $100 per hotel)'
          },
          {
            title: '🎲 If You Rolled Doubles',
            description: 'Draw and follow your Chance card first, then roll again! Exception: If the Chance card sends you to Jail, your turn ends (no extra roll).'
          }
        ],
        tips: [
          'Chance cards can drastically change the game - be prepared for anything!',
          'Keep track of which Chance cards have been drawn to anticipate what\'s coming',
          'Some cards move you backwards - you don\'t collect GO if moving backwards',
          'Trading a "Get Out of Jail Free" card can be very valuable in negotiations'
        ]
      },
      'Community Chest': {
        icon: '📦',
        title: 'Community Chest',
        mainRules: [
          'Draw the top card from the Community Chest deck',
          'Follow the instructions on the card immediately',
          'Return the card to the bottom of the deck (unless it\'s "Get Out of Jail Free")',
          'Most Community Chest cards involve receiving or paying money'
        ],
        scenarios: [
          {
            title: 'Money Received',
            description: 'Cards like "Bank error in your favor", "Income tax refund", "Inherit $100" - collect from the Bank'
          },
          {
            title: 'Money Paid',
            description: 'Cards like "Doctor\'s fees", "Hospital fees", "School fees" - pay to the Bank'
          },
          {
            title: 'Birthday/Collect from Players',
            description: 'Some cards make every other player pay you (e.g., "It\'s your birthday - collect $10 from each player")'
          },
          {
            title: 'Get Out of Jail Free',
            description: 'Keep this card. You can use it when needed or sell it to another player'
          },
          {
            title: '🎲 If You Rolled Doubles',
            description: 'Draw and follow your Community Chest card first, then roll again! Exception: If the card sends you to Jail, your turn ends (no extra roll).'
          }
        ],
        tips: [
          'Community Chest cards are generally less risky than Chance cards',
          'The "Collect from every player" cards are great when playing with many players',
          'If you have to pay but don\'t have enough money, you can mortgage properties or sell houses',
          'Birthday cards can be worth a lot in a 4+ player game!'
        ]
      },
      'Free Parking': {
        icon: '🅿️',
        title: 'Free Parking',
        mainRules: [
          'This is a free resting space - no action required',
          'Nothing happens when you land here',
          'You are safe from rent or penalties',
          'House Rule: Some families put tax money here as a jackpot (not official rules)'
        ],
        scenarios: [
          {
            title: 'Standard Rules',
            description: 'Landing here does nothing. It\'s just a safe space to rest'
          },
          {
            title: 'Popular House Rule',
            description: 'Many families collect all tax money, fines, and fees in the center. Landing on Free Parking wins this jackpot. This is NOT in official rules but very common!'
          },
          {
            title: 'Strategic Use',
            description: 'If using house rules with jackpot, you can\'t control landing here, but it can provide a big cash boost'
          },
          {
            title: '🎲 If You Rolled Doubles',
            description: 'Take your rest (or collect the jackpot if using house rules), then roll again! This is a safe spot with a bonus roll.'
          }
        ],
        tips: [
          'This is the safest space on the board - enjoy the break!',
          'Official Monopoly rules say nothing happens here, but most families use the jackpot house rule',
          'If playing with jackpot rules, this can be a game-changer when you\'re low on cash',
          'Remember: House rules should be agreed upon before the game starts'
        ]
      },
      'Income Tax': {
        icon: '💸',
        title: 'Income Tax',
        mainRules: [
          'Pay $200 to the Bank',
          'This is mandatory - you must pay when you land here',
          'If you don\'t have enough cash, mortgage properties or sell houses',
          'You cannot negotiate this payment'
        ],
        scenarios: [
          {
            title: 'Have Enough Cash',
            description: 'Simply pay $200 to the Bank and continue'
          },
          {
            title: 'Don\'t Have $200',
            description: 'You must raise money by: (1) Mortgaging properties, (2) Selling houses/hotels back to Bank at half price, (3) Trading with other players'
          },
          {
            title: 'Still Can\'t Pay',
            description: 'If you cannot raise $200 even after selling everything, you are bankrupt and out of the game'
          },
          {
            title: '🎲 If You Rolled Doubles',
            description: 'Pay your $200 tax first, then roll again! The doubles rule still applies - taxes don\'t cancel your extra roll.'
          }
        ],
        tips: [
          'Always keep some cash reserves for taxes and rent!',
          'This space appears early in the game when you may have less cash',
          'Mortgage undeveloped properties before selling houses to avoid losing money',
          'Try to maintain at least $200-300 in cash to avoid emergencies'
        ]
      },
      'Luxury Tax': {
        icon: '💎',
        title: 'Luxury Tax',
        mainRules: [
          'Pay $100 to the Bank',
          'This is mandatory when you land here',
          'If you don\'t have enough cash, mortgage properties or sell houses',
          'You cannot negotiate this payment'
        ],
        scenarios: [
          {
            title: 'Have Enough Cash',
            description: 'Pay $100 to the Bank and continue playing'
          },
          {
            title: 'Don\'t Have $100',
            description: 'Raise money by mortgaging properties, selling houses/hotels, or trading with players'
          },
          {
            title: 'Bankruptcy',
            description: 'If you cannot pay even after liquidating everything, you\'re out of the game'
          },
          {
            title: '🎲 If You Rolled Doubles',
            description: 'Pay your $100 tax first, then roll again! The doubles rule still applies - taxes don\'t cancel your extra roll.'
          }
        ],
        tips: [
          'Luxury Tax is half the cost of Income Tax - less painful!',
          'This appears late in the game near Boardwalk when properties are expensive',
          'Keep cash reserves, especially in the late game',
          'Better to land here than on a property with hotels!'
        ]
      }
    };

    // Map square types to rules
    if (square.name === 'GO') return rulesMap['GO'];
    if (square.name === 'Jail / Just Visiting') return rulesMap['Jail / Just Visiting'];
    if (square.name === 'Go To Jail') return rulesMap['Go To Jail'];
    if (square.name === 'Free Parking') return rulesMap['Free Parking'];
    if (square.type === 'chance') return rulesMap['Chance'];
    if (square.type === 'community_chest') return rulesMap['Community Chest'];
    if (square.name === 'Income Tax') return rulesMap['Income Tax'];
    if (square.name === 'Luxury Tax') return rulesMap['Luxury Tax'];

    return null;
  };

  const rules = getSpecialSquareRules(square);
  if (!rules) return null;

  return (
    <div className="special-square-rules">
      <div className="rules-header">
        <span className="rules-icon">{rules.icon}</span>
        <h3 className="rules-title">{rules.title}</h3>
      </div>

      <div className="rules-section">
        <h4 className="section-title">📋 Main Rules</h4>
        <ul className="rules-list">
          {rules.mainRules.map((rule, index) => (
            <li key={index} className="rule-item">{rule}</li>
          ))}
        </ul>
      </div>

      <div className="rules-section">
        <h4 className="section-title">🎯 Scenarios & What To Do</h4>
        <div className="scenarios-grid">
          {rules.scenarios.map((scenario, index) => (
            <div key={index} className="scenario-card">
              <h5 className="scenario-title">{scenario.title}</h5>
              <p className="scenario-description">{scenario.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rules-section tips-section">
        <h4 className="section-title">💡 Helpful Tips</h4>
        <ul className="tips-list">
          {rules.tips.map((tip, index) => (
            <li key={index} className="tip-item">{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SpecialSquareRules;
