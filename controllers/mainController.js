const controller = {};

controller.login = (req, res) => {
    const email  = req.body.email;
    console.log(email);
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM table_user WHERE email = ?', [email], (err, rows) => {
        if(rows!=undefined){
            if (rows.length>0){
                req.session.user = rows[0];
                res.redirect('/lobby');
            }else{
                res.render('home', {
                    denied: true 
                });
            }
        }else{
            res.render('home', {
                denied: true 
            });
        }
      });
    });
};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM table_user', (err, customers) => {
     if (err) {
      res.json(err);
     }
     console.log(customers[0]);
     res.render('home', {
        data: customers[0]
     });
    });
  });
};

controller.saveTimeAuditorio = (req, res) => {
  var id = req.body.id;
  var minutes = 1;
  console.log(req.body.id);
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM time_in_transmission_one WHERE id_user = ?', [id], (err, rows) => {
      if(rows!=undefined){
          if (rows.length>0){
            minutes = minutes + rows[0].minutes;
            conn.query('UPDATE time_in_transmission_one set minutes = ?, date_time_update = ? where id_user = ?', [minutes, new Date(), id], (err, update_r) => {
              if (err) {
                console.log(err);
               }console.log("update");
            });
          }else{
            conn.query('INSERT INTO time_in_transmission_one VALUES (NULL,?,?,?,?)', [id,minutes,new Date(),new Date()], (err, insert_r) => {
              if (err) {
                console.log(err);
               }console.log("insert");
            });
          }
      }else{
        if (err) {
          res.json(err);
         }
      }
    });
  })
};

/*
controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO customer set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/');
    })
  })
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM customer WHERE id = ?", [id], (err, rows) => {
      res.render('customers_edit', {
        data: rows[0]
      })
    });
  });
};



controller.update = (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });
}
*/
module.exports = controller;
