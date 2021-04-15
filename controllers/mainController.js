const controller = {};

controller.login = (req, res) => {
    const email  = req.body.email;
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM table_user WHERE email = ?', [email], (err, rows) => {
        if(rows!=undefined){
            if (rows.length>0){
                req.session.user = rows[0];
                conn.query('INSERT INTO table_session VALUES (NULL,?,?)', [rows[0].id,new Date()], (err, insert_r) => {
                  if (err) {
                      console.log(err);
                    }
                });
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
     res.render('home', {
        data: customers[0]
     });
    });
  });
};

controller.saveStandView = (req, res) => {
  var id = req.body.id;
  var times = 1;
  var id_stand = req.body.id_stand;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM stand_view WHERE id_user = ? AND id_stand = ?', [id, id_stand], (err, rows) => {
      if(rows!=undefined){
          if (rows.length>0){
            times = times + rows[0].views_count;
            conn.query('UPDATE stand_view set views_count = ?, date_time_update = ? where id_user = ? AND id_stand = ?', [times, new Date(), id, id_stand], (err, update_r) => {
              if (err) {
                console.log(err);
               }
               res.send("update");
            });
          }else{
            conn.query('INSERT INTO stand_view VALUES (NULL,?,?,?,?,?)', [id,id_stand,times,new Date(),new Date()], (err, insert_r) => {
              if (err) {
                console.log(err);
               }
               res.send("insert");
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

controller.saveTimeAuditorio = (req, res) => {
  var id = req.body.id;
  var minutes = 1;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM time_in_transmission_one WHERE id_user = ?', [id], (err, rows) => {
      if(rows!=undefined){
          if (rows.length>0){
            minutes = minutes + rows[0].minutes;
            conn.query('UPDATE time_in_transmission_one set minutes = ?, date_time_update = ? where id_user = ?', [minutes, new Date(), id], (err, update_r) => {
              if (err) {
                console.log(err);
               }
               res.send("update");
            });
          }else{
            conn.query('INSERT INTO time_in_transmission_one VALUES (NULL,?,?,?,?)', [id,minutes,new Date(),new Date()], (err, insert_r) => {
              if (err) {
                console.log(err);
               }
               res.send("insert");
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
